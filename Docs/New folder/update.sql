


---motor
update gim_policy 
set PolicyStartDt= '2025-03-21 12:00:00.000',  PolicyEndDt ='2026-03-21 12:00:00.000', PolicyIssuanceDt='2025-03-21 14:35:54.857' , PPWDays='2'
where POLICYCODE='10000/31/25/000061'

select PolicyCode, PPWDays,PolicyIssuanceDt ,PolicyStartDt, PolicyEndDt, * from gim_policy 
where PolicyCode = '10000/31/25/000061'

--non motor
update gnm_t_phil_policy 
set POLICYSTARTDT= '2025-03-18 16:00:00.000',  POLICYENDDT ='2026-03-17 12:00:00.000',
POLICYISSUEDT='2025-03-18 16:00:00.000', Payment_Terms ='2'
where POLICYCODE='10000/11/25/000026' 

select Payment_Terms, POLICYISSUEDT, POLICYSTARTDT, POLICYENDDT,  * from gnm_t_phil_policy where POLICYCODE='10000/11/25/000026' 

select * from sys.procedures order by create_date desc

--- mail steps
truncate table Gim_Phl_endr_automail
go
exec USP_GIM_Auto_Cancellation_Schedular
go
select Reminder1,Reminder2,Reminder3,canceldate,* from Gim_Phl_endr_automail


--- auto cancel steps
exec USP_GIM_PolicyAutoCancel_Tran
go
select * from GIM_EndrPolicy_AutoCancel


select PolicyCode, PPWDays,PolicyIssuanceDt ,PolicyStartDt, PolicyEndDt, * from GIM_Policy order by PkpoliId desc;

select Payment_Terms, POLICYISSUEDT, POLICYSTARTDT, POLICYENDDT,  * from gnm_t_phil_policy order by pkid desc;
