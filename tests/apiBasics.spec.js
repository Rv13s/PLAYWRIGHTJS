import{test,expect} from '@playwright/test'
import { request } from 'node:https'


test('Get Basics', async({request})=>{
    const response =  await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body)

    expect(body.userId).toBe(2)
})

test('TPA claim intimation', async({request})=>{
    const response = await request.post("https://nsecureapiuat.shriramgi.com/UATETASSGPA/api/TPAClaimIntimation",{
        data:{
            
  "TPAClaimNumber": "123456789",
  "PolicyNumber": "421010/85/26/000435",
  "ProductName": "Shri Health Suraksha",
  "PolicyType": "31",
  "InsurerMemberId": "42315378",
  "InsuredPatientName": "Mr. MAHASWIN S",
  "InsuredRelationWithProposer": "SELF",
  "SumInsured": "750000.00",
  "BalancedSumInsured": "700000",
  "HospCode": "292120",
  "HospitalName": " Cisro Hospital",
  "HospitalCity": "Patna",
  "HospitalState": "Bihar",
  "HospitalNameAddress": "Naya Tola,Bailey Road, Saguna More, DanapurPatna, Bihar",
  "HospitalNameType": "1",
  "RohiniCode": "8900080469334",
  "ReasonForAdmission": "1",
  "AdmissionDateTime": "2026-01-08 20:36:00.000",
  "DischargeDateTime": "2026-01-10 16:15:00.000",
  "ClaimType": "Pre Hospitalisation",
  "MainInsurerClaimNumber": "10000/85/26/N/0000212/001",
  "ClaimSource": "CHD",
  "ClaimStage": "Test",
  "ClaimStatus": "Intimated",
  "ClaimedAmount": "50000",
  "IntimationDateTime": "2026-01-08 17:30:00.000",
  "ICDCode": "23-Others",
  "ModeOfTreatment": "1-Surgical",
  "TreatmentName": "Fever Injection"
}
        
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body.InsurerClaimNumber);

    //assertions
    expect(body.Status).toBe('Success');
    expect(body.Message).toBe('Saved Successfully');
    expect(body.TPAClaimNumber).toBeDefined();
    expect(body.InsurerClaimNumber).toBeDefined();

})



test('End-to-End Claim Processing Flow', async ({ request }) => {

  // ==============================
  // STEP 1: Claim Intimation
  // ==============================

  const intimationResponse = await request.post(
    'https://nsecureapiuat.shriramgi.com/UATETASSGPA/api/TPAClaimIntimation',
    {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
      data: {
        TPAClaimNumber: "123456789",
        PolicyNumber: "421010/85/26/000435",
        ProductName: "Shri Health Suraksha",
        PolicyType: "31",
        InsurerMemberId: "42315378",
        InsuredPatientName: "Mr. MAHASWIN S",
        InsuredRelationWithProposer: "SELF",
        SumInsured: "750000.00",
        BalancedSumInsured: "700000",
        HospCode: "292120",
        HospitalName: "Cisro Hospital",
        HospitalCity: "Patna",
        HospitalState: "Bihar",
        HospitalNameAddress: "Naya Tola,Bailey Road, Saguna More, Danapur Patna, Bihar",
        HospitalNameType: "1",
        RohiniCode: "8900080469334",
        ReasonForAdmission: "1",
        AdmissionDateTime: "2026-01-08 20:36:00.000",
        DischargeDateTime: "2026-01-10 16:15:00.000",
        ClaimType: "Cashless",
        ClaimSource: "CHD",
        ClaimStage: "Test",
        ClaimStatus: "Intimated",
        ClaimedAmount: "50000",
        IntimationDateTime: "2026-01-08 17:30:00.000",
        ICDCode: "23-Others",
        ModeOfTreatment: "1-Surgical",
        TreatmentName: "Fever Injection"
      }
    }
  );

  expect(intimationResponse.status()).toBe(200);

  const intimationBody = await intimationResponse.json();

  expect(intimationBody.Status).toBe("Success");

  const insurerClaimNumber = intimationBody.InsurerClaimNumber;

  console.log("Captured InsurerClaimNumber:", insurerClaimNumber);

  // ==============================
  // STEP 2: Claim Decision (Processing)
  // ==============================

  const decisionResponse = await request.post(
    'https://nsecureapiuat.shriramgi.com/UATETASSGPA/api/TPAClaimDecision',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        TPAClaimNumber: "123456789",
        InsurerClaimNumber: insurerClaimNumber,  // 🔥 Dynamic value
        ClaimedAmount: "50000",
        PatientName: "Mr. MAHASWIN S",
        PolicyNumber: "421010/85/26/000370",
        InsurerMemberId: "42315378",
        ClaimType: "Cashless",
        CauseofLossorTypeofAdmis: "14-Inpatient Treatment-Emergency Hospitalization",
        FinalDiagnosisorAilment: "23-Others",
        ICDCode: "201-C31_Malignant neoplasm of accessory sinuses",
        TreatmentName: "TestTreatment",
        ModeofTreatment: "1-Surgical",
        SystemofMedicines: "1-Allopathy",
        SpecialtyofTreatment: "1-General Medicine",
        TPAClaimStatus: "Approved",   // 🔥 Change status here
        TotalHospitalisationFinalBillAmount: "50000",
        FinalHospitalisationApprovedAmountAfterAllDeductions: "4000",
        TotalClaimedAmount: "52000",
        ClaimApprovalRemarks: "Nothing",
        ClaimApprovalDateandTime: "2026-01-09 15:15:00.000",
        PaymentMode: "NEFT-N",
        PayeeType: "Cashless"
      }
    }
  );

  expect(decisionResponse.status()).toBe(200);

  const decisionBody = await decisionResponse.json();

  console.log("Decision Response:", decisionBody);

  expect(decisionBody.Status).toBe("Success");
  expect(decisionBody.Message).toBe("Status Updated Successfully");
});


test('Parent → Child → Child Decision Flow', async ({ request }) => {

  const baseURL = 'https://nsecureapiuat.shriramgi.com/UATETASSGPA/api';

  const parentTPA = `AUTO${Date.now()}`;
  const childTPA = `CHILD${Date.now()}`;

  // ====================================================
  // STEP 1: Create Parent Claim
  // ====================================================

  const parentRes = await request.post(`${baseURL}/TPAClaimIntimation`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      TPAClaimNumber: parentTPA,
      PolicyNumber: "421010/85/26/000370",
      ProductName: "Shri Health Suraksha",
      PolicyType: "31",
      InsurerMemberId: "42315378",
      InsuredPatientName: "Mr. MAHASWIN S",
      InsuredRelationWithProposer: "SELF",
      SumInsured: "750000.00",
      BalancedSumInsured: "700000",
      HospCode: "292120",
      HospitalName: "Cisro Hospital",
      HospitalCity: "Patna",
      HospitalState: "Bihar",
      HospitalNameType: "1",
      RohiniCode: "8900080469334",
      ReasonForAdmission: "1",
      AdmissionDateTime: "2026-01-08 20:36:00.000",
      DischargeDateTime: "2026-01-10 16:15:00.000",
      ClaimType: "Cashless",
      ClaimStatus: "Intimated",
      ClaimedAmount: "50000",
      IntimationDateTime: "2026-01-08 17:30:00.000",
      ICDCode: "23-Others",
      ModeOfTreatment: "1-Surgical",
      TreatmentName: "Fever Injection"
    }
  });

  const parentBody = await parentRes.json();
  expect(parentBody.Status).toBe("Success");

  const parentInsurerClaimNumber = parentBody.InsurerClaimNumber;
  console.log("Parent InsurerClaimNumber:", parentInsurerClaimNumber);

  // ====================================================
  // STEP 2: Approve Parent Claim
  // ====================================================

  await request.post(`${baseURL}/TPAClaimDecision`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      TPAClaimNumber: parentTPA,
      InsurerClaimNumber: parentInsurerClaimNumber,
      ClaimedAmount: "50000",
      PatientName: "Mr. MAHASWIN S",
      PolicyNumber: "421010/85/26/000370",
      InsurerMemberId: "42315378",
      ClaimType: "Cashless",
      TPAClaimStatus: "Approved",
      TotalHospitalisationFinalBillAmount: "50000",
      FinalHospitalisationApprovedAmountAfterAllDeductions: "4000",
      TotalClaimedAmount: "52000",
      ClaimApprovalRemarks: "Approved Parent",
      ClaimApprovalDateandTime: "2026-01-09 15:15:00.000"
    }
  });

  console.log("Parent Approved");

  // ====================================================
  // STEP 3: Create Child Claim
  // ====================================================

  const childRes = await request.post(`${baseURL}/TPAClaimIntimation`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      TPAClaimNumber: childTPA,
      PolicyNumber: "421010/85/26/000370",
      ProductName: "Shri Health Suraksha",
      PolicyType: "31",
      InsurerMemberId: "42315378",
      InsuredPatientName: "Mr. MAHASWIN S",
      InsuredRelationWithProposer: "SELF",
      SumInsured: "750000.00",
      BalancedSumInsured: "700000",
      HospCode: "292120",
      HospitalName: "Cisro Hospital",
      HospitalCity: "Patna",
      HospitalState: "Bihar",
      HospitalNameType: "1",
      RohiniCode: "8900080469334",
      ReasonForAdmission: "1",
      AdmissionDateTime: "2026-01-08 20:36:00.000",
      DischargeDateTime: "2026-01-10 16:15:00.000",

      ClaimType: "Pre Hospitalisation",
      MainInsurerClaimNumber: parentInsurerClaimNumber,

      ClaimStatus: "Intimated",
      ClaimedAmount: "5000",
      IntimationDateTime: "2026-01-11 10:00:00.000",
      ICDCode: "23-Others",
      ModeOfTreatment: "1-Surgical",
      TreatmentName: "Follow-up Treatment"
    }
  });

  const childBody = await childRes.json();
  expect(childBody.Status).toBe("Success");

  const childInsurerClaimNumber = childBody.InsurerClaimNumber;

  console.log("Child InsurerClaimNumber:", childInsurerClaimNumber);

  // ====================================================
  // STEP 4: Pass Child Claim to Decision API
  // ====================================================

  const childDecisionRes = await request.post(`${baseURL}/TPAClaimDecision`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      TPAClaimNumber: childTPA,
      InsurerClaimNumber: childInsurerClaimNumber,
      ClaimedAmount: "5000",
      PatientName: "Mr. MAHASWIN S",
      PolicyNumber: "421010/85/26/000370",
      InsurerMemberId: "42315378",
      ClaimType: "Pre Hospitalisation",
      TPAClaimStatus: "Approved",   // 🔥 Change status here
      TotalHospitalisationFinalBillAmount: "5000",
      FinalHospitalisationApprovedAmountAfterAllDeductions: "4000",
      TotalClaimedAmount: "5000",
      ClaimApprovalRemarks: "Approved Child Claim",
      ClaimApprovalDateandTime: "2026-01-12 12:00:00.000"
    }
  });

  const childDecisionBody = await childDecisionRes.json();

  console.log("Child Decision Response:", childDecisionBody);

  expect(childDecisionBody.Status).toBe("Success");
  expect(childDecisionBody.Message).toBe("Status Updated Successfully");

});

