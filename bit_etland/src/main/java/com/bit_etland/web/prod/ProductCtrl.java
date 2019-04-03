package com.bit_etland.web.prod;

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

@RestController
public class ProductCtrl {
private static final Logger logger = LoggerFactory.getLogger(ProductCtrl.class);
	
	@Autowired Product prod;
	@Autowired PrintService ps;
	@Autowired ProductMapper prodMap;
	@Autowired Map<String, Object> map;
	@Autowired Users<?> users;
	@Autowired Proxy pxy;
	
	@PostMapping("/phones")
	public Map<?,?> regist(
			@RequestBody Product param) {
		logger.info("등록 진입");
		IConsumer i = (Object o) -> prodMap.registProduct(param);
		i.accept(param);
		map.clear();
		map.put("s", "s");
		return map;
	}

	@GetMapping("/phones/page/{page}")
	public Map<?,?> list(
			@PathVariable String page) {
		map.clear();
		System.out.println("넘어온 페이지는"+page);
		map.put("pageNum", page);
		map.put("pageSize", "5");
		map.put("blockSize", "5");
		ISupplier is = () -> prodMap.countProduct();
		map.put("totalCount", is.get());
		pxy.carryOut(map);
		
		IFunction i = (Object o) -> prodMap.bringProductList(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		return map;
	}
	
	@PutMapping("/phones/{userid}")
	public Map<?,?> update(
			@PathVariable String userid,
			@RequestBody Product param) {
		System.out.println("update 진입");
		IConsumer i = (Object o) -> prodMap.modifyProduct(param);
		i.accept(param);
		
		map.clear();
		map.put("s", "s");
		return map;
	}
	
	@DeleteMapping("/phones/{userid}")
	public Map<?,?> delete(
			@PathVariable String userid,
			@RequestBody Product param) {
		System.out.println("delete 진입");
		IConsumer i = (Object o) -> prodMap.removeProduct(param);
		i.accept(param);
		map.clear();
		map.put("s", "s");
		return map;
	}
}