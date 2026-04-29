select * from GIM_Policy   order by PkpoliId desc;

select ProposalType_desc,PolicyStartDt,PolicyEndDt, * from gim_policy where  PolicyType_desc='Own Damage and Theft' or PolicyCode='10000/31/25/000001'

Select Total_Sum_insured,Active,* from gim_policy where Fairmarketvalue != VehRevisedIDVAmt and PolicyStatusDesc like'%cancel%'  order by PkpoliId desc


Select count(pkpoliID) from gim_policy order by PkpoliId desc

select * from GNM_PHIL_Receipt_h
select * from GNM_PHIL_Receipt_d 


Select SettleGrossAmt,Total_Sum_insured,SettLossType,SettLossTypeDesc,* from gim_claim a join gim_policy b on a.Policynumber=b.PolicyCode 
join GIM_MTCLM_Settlement c on a.PKClmID = c.FkClaimId  where SettleGrossAmt > (Total_Sum_insured/2) order by PKClmID desc

Select SUMINSURED,SettleGrossAmt,* from GNM_Claim a join GNM_T_PHIL_POLICY b on a.Policynumber=b.PolicyCode join GNM_CLM_Settlement c on a.PKClmID = c.FkClaimId  
where SettleGrossAmt > (SUMINSURED/2) order by PKClmID desc


select * from GNM_PHIL_Receipt_h a join GNM_PHIL_Receipt_d b on a.Pk_Rec_id=b.FkRecid

select * from gim_claim
select * gim