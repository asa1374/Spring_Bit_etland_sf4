package com.bit_etland.web.emp;

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
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Users;

@RestController
public class EmployeeCtrl {
private static final Logger logger = LoggerFactory.getLogger(EmployeeCtrl.class);
	
	@Autowired Employee emp;
	@Autowired PrintService ps;
	@Autowired EmployeeMapper empMap;
	@Autowired Map<String, Object> map;
	@Autowired Users<?> users;
	
	@PostMapping("/cust/{userid}")
	public Employee login(
			@PathVariable String user,
			@PathVariable String userid,
			@RequestBody Employee param) {
		logger.info("login 진입");
		IFunction i = (Object o) -> empMap.selectEmployee(param);
		return (Employee) i.apply(param);
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/{user}/list")
	public List<Users<?>> list(
			@PathVariable String user,
			@RequestBody Employee param) {
		logger.info("List 진입");
		IFunction i = (Object o) -> empMap.selectEmployee(param);
		return (List<Users<?>>)i.apply(param);
	}
	
	@PostMapping("/cust")
	public Map<?,?> join(
			@PathVariable String user,
			@RequestBody Employee param) {
		logger.info("등록 진입");
		IConsumer i = (Object o) -> empMap.registEmployee(param);
		i.accept(param);
		map.clear();
		map.put("s", "s");
		return map;
	}

	@PutMapping("/{user}/{userid}")
	public Map<?,?> update(
			@PathVariable String user,
			@PathVariable String userid,
			@RequestBody Employee param) {
		System.out.println("update 진입");
		IConsumer i = (Object o) -> empMap.modifyEmployee(param);
		i.accept(param);
		
		map.clear();
		map.put("s", "s");
		return map;
	}
	
	@DeleteMapping("/{user}/{userid}")
	public Map<?,?> delete(
			@PathVariable String user,
			@PathVariable String userid,
			@RequestBody Employee param) {
		System.out.println("delete 진입");
		IConsumer i = (Object o) -> empMap.registEmployee(param);
		i.accept(param);
		map.clear();
		map.put("s", "s");
		return map;
	}
}