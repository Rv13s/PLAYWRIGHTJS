select * from gim_policy order by PkpoliId desc

select RecAmt,* from GIM_Receipt_h

-- Payment pending policies motor
select b.RecAmt,a.NetPrem,  * from gim_policy a left join GIM_Receipt_h b on a.PolicyCode=b.PolicyNo order by a.PkpoliId desc

---------------------------------------------------------

select * from GNM_T_PHIL_POLICY order by pkid desc

select RecAmt,* from GNM_PHIL_Receipt_h

-- Payment pending policies non-motor
select b.RecAmt,a.NetPrem, * from gnm_t_phil_policy a left join GNM_PHIL_Receipt_h b on a.POLICYCODE=b.PolicyNo order by pkid desc
