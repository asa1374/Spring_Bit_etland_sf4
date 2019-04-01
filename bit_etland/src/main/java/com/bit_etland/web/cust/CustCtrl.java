package com.bit_etland.web.cust;


import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.ISupplier;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Proxy;
import com.bit_etland.web.cmm.Users;
import com.bit_etland.web.emp.Employee;

@RestController
public class CustCtrl {
	
	private static final Logger logger = LoggerFactory.getLogger(CustCtrl.class);
	
	@Autowired Customer cust;
	@Autowired Employee emp;
	@Autowired PrintService ps;
	@Autowired CustomerMapper custMap;
	@Autowired Map<String, Object> map;
	@Autowired Users<?> users;
	@Autowired List<Customer> list;
	@Autowired Proxy pxy;
	
	@PostMapping("/customers/{userid}")
	public Customer login(
			@PathVariable String userid,
			@RequestBody Customer param) {
		System.out.println("로그인 진입");
		IFunction i = (Object o) -> custMap.selectCustomer(param);
		return (Customer)i.apply(param);
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/customers/page/{page}")
	public List<Customer> list(
			@PathVariable String page) {
		map.clear();
		map.put("pageNum", "1");
		map.put("pageSize", "5");
		map.put("blockSize", "5");
		map.put("totalCount", "30");
		pxy.carryOut(map);
		
		IFunction i = (Object o) -> custMap.bringCustomerList(pxy);
		List<Customer> ls = (List<Customer>) i.apply(pxy);
		return ls;
	}

	@PutMapping("/customers/{userid}")
	public Map<?,?> update(
			@PathVariable String userid,
			@RequestBody Customer param) {
		System.out.println("update 진입");
		IConsumer i = (Object o) -> custMap.modifyCustomer(param);
		i.accept(param);
		
		map.clear();
		map.put("s", "s");
		return map;
	}
	
	@DeleteMapping("/customers/{userid}")
	public Map<?,?> delete(
			@PathVariable String userid,
			@RequestBody Customer param) {
		System.out.println("delete 진입");
		IConsumer i = (Object o) -> custMap.registCustomer(param);
		i.accept(param);
		map.clear();
		map.put("s", "s");
		return map;
	}
}