package com.bit_etland.web.cust;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface CustomerMapper {
	public void registCustomer(Customer cus);
	public List<Customer> bringCustomerList(Map<?,?> m);
	public List<Customer> selectCategoris(Map<?,?> m);
	public Customer selectCustomer(Customer cus);
	public int countCustomer(Map<?,?> m);
	public void modifyCustomer(Customer cus);
	public Map<String, Object> selectProfile(Map<?,?> m);
	public void removeCustomer(Customer cus);
	public Map<String, Object> selectPhone(Map<?,?> m);
}
