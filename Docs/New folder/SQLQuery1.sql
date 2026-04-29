--select * from gnm_t_policy where POLICYENDDT between getdate()-10 and getdate()+10 and policyno like '421010%'

 
--select * from gnm_t_policy where BRANCODE= '421010' and PRODCODE = 'MIST-PRD-080' and POLICYENDDT between getdate()-10 and getdate()+10

--select * from GNM_T_POLICY  where BRANCODE= '421010' and PRODCODE = 'MIST-PRD-080' order by PolicyNo DESC 

--select * from gnm_t_policy where BRANCODE= '421010' and PRODCODE = 'MIST-PRD-080' and POLICYENDDT between getdate()-10 and getdate()+10 order by PolicyNo DESC 

--select Top 100 * from GNM_T_POLICY  where BRANCODE= '421010' and PRODCODE = 'MIST-PRD-080' order by PolicyNo DESC 

--select * from gnm_t_policy where BRANCODE= '421010' and PRODCODE = 'MIST-PRD-080' and POLICYENDDT between getdate()-10 and getdate()+10 order by PolicyNo DESC 
--select Top 1000 * from GNM_T_POLICY  
--select * from gnm_t_policy where BRANCODE= '421010' and PRODCODE = 'MIST-PRD-080' and POLICYENDDT between getdate()-10 and getdate()+10 order by PolicyNo DESC

SELECT DISTINCT POLICYTYPEDESC
FROM GNM_T_POLICY;

--select Top 100 * from GNM_T_POLICY  where BRANCODE= '421010'  and POLICYTYPEDESC = 'SHRI BHARAT GRIHA RAKSHA'  and BUSTYPE = '3' order by PolicyNo asc

--update GNM_T_POLICY  set POLICYSTARTDT ='', SHRI GROUP PERSONAL ACCIDENT - UNNAMED

select Top 100 POLICYSTARTDT, POLICYENDDT, * from GNM_T_POLICY  where PolicyNo like '%49/24%'  order by PKID desc
select Top 100 * from GNM_T_POLICY WHERE PRODCODE = 'MIST-PRD-076' AND BUSTYPE ='3'


--ZIVA 
select PPWDays,PolicyStartDt,* from GIM_Policy where PolicyCode='10000/31/25/000073 ' where PolicyTypeDesc ='SHRI INDIVIDUAL PERSONAL ACCIDENT INSURANCE' desc

select * from GNM_T_PHIL_POLICY where PRODDESC='Contractors All Risk Insurance' order  by pkid desc

select RecoverType_desc,* from GIM_MTCLM_Registration where ClaimNo = '10000/31/25/N/0000049'

select RecoverType_desc,* from GNM_CLM_Registration order by PkClaimId desc


select * from GNM_Claim order by PKClmID desc
select * from GNM_T_PHIL_POLICY  where PRODCODE='IPA-PRD-001'          order  by pkid desc

select * from GIM_RI_Payment_Receipt_h where PolicyNo='10000/48/25/000164'

select * from GNM_T_PHIL_POLICY where PRODDESC='Comprehensive General Liability Insurance' order by PKID desc

select POLICYSTARTDT,AGTCODE, * from GNM_T_PHIL_POLICY where AGTCODE like 'RIN00%' and PRODCODE='FIR-PRD-001' order by pkid desc

select  * from GIM_Policy where PolicyCode ='10000/31/25/000134'


select POLICYSTARTDT,AGTCODE, * from GNM_T_PHIL_POLICY where AGTCODE like 'RIN00%' order by pkid desc