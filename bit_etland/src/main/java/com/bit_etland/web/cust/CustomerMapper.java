package com.bit_etland.web.cust;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;

@Repository
public interface CustomerMapper {
	public void registCustomer(Customer cus);
	public List<?> bringCustomerList(Proxy pxy);
	public List<Customer> selectCategoris(Map<?,?> m);
	public Customer selectCustomer(Customer cus);
	public int countCustomer();
	public void modifyCustomer(Customer cus);
	public Map<String, Object> selectProfile(Map<?,?> m);
	public void removeCustomer(Customer cus);
	public Map<String, Object> selectPhone(Map<?,?> m);
}