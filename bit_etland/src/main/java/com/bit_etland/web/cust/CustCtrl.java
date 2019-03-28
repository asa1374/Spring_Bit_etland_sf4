package com.bit_etland.web.cust;


import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Users;
import com.bit_etland.web.emp.Employee;
import com.bit_etland.web.emp.EmployeeMapper;

@RestController
@RequestMapping("/users")
public class CustCtrl {
	
	private static final Logger logger = LoggerFactory.getLogger(CustCtrl.class);
	
	@Autowired Customer cust;
	@Autowired Employee emp;
	@Autowired PrintService ps;
	@Autowired CustomerMapper custMap;
	@Autowired EmployeeMapper empMap;
	@Autowired Map<String, Object> map;
	@Autowired Users<?> users;
	
	@PostMapping("/cust/login")
	public Customer login(
			@RequestBody Customer param) {
		System.out.println("로그인 진입");
		IFunction i = (Object o) -> custMap.selectCustomer(param);
		return (Customer)i.apply(param);
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/{user}/list")
	public List<Users<?>> list(
			@PathVariable String user,
			@RequestBody Customer param) {
		logger.info("List 진입");
		IFunction i = (Object o) -> custMap.selectCustomer(param);
		return (List<Users<?>>)i.apply(param);
	}
	
	@PostMapping("/cust")
	public Map<?,?> join(
			@RequestBody Customer param) {
		logger.info("등록 진입");
		IConsumer i = (Object o) -> custMap.registCustomer(param);
		i.accept(param);
		map.clear();
		map.put("s", "s");
		return map;
	}

	@PutMapping("/cust/u")
	public Map<?,?> update(
			@RequestBody Customer param) {
		System.out.println("update 진입");
		IConsumer i = (Object o) -> custMap.modifyCustomer(param);
		i.accept(param);
		
		map.clear();
		map.put("s", "s");
		return map;
	}
	
	@DeleteMapping("/cust/d")
	public Map<?,?> delete(
			@PathVariable String user,
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