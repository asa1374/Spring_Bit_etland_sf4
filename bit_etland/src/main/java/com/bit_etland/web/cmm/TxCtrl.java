package com.bit_etland.web.cmm;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.bit_etland.web.prod.ProductMapper;


@RestController
@Transactional
public class TxCtrl {

	@Autowired Map<String, Object> map;
	@Autowired ProductMapper prodMap;
	@Autowired Proxy pxy;
	
	
	@GetMapping("/transaction/{page}/{search}")
	public Map<?,?> login(
			@PathVariable("page") String page,
			@PathVariable String search) {
		
		System.out.println("TX 진입");
		String sa = "%"+search+"%";
		map.clear();
		map.put("pageNum", page);
		map.put("pageSize", "5");
		map.put("blockSize", "5");
		ISupplier ic = ()-> prodMap.searchcountProducts(sa);
		map.put("totalCount", ic.get());
		
		map.put("search", search);
		pxy.carryOut(map);
		IFunction f = (Object o) -> prodMap.retrieveProducts(pxy);
		List<?> ls = (List<?>) f.apply(pxy);
		
		map.clear();
		map.put("s", "s");
		map.put("ls", ls);
		map.put("pxy", pxy);
		
		return map;
	}
	@GetMapping("/phones/{page}/{search}")
	public Map<?,?> grid(
			@PathVariable("page") String page,
			@PathVariable String search) {
		
		System.out.println("TX 진입");
		String sa = "%"+search+"%";
		map.clear();
		map.put("pageNum", page);
		map.put("pageSize", "9");
		map.put("blockSize", "5");
		ISupplier ic = ()-> prodMap.searchcountProducts(sa);
		map.put("totalCount", ic.get());
		
		map.put("search", search);
		pxy.carryOut(map);
		IFunction f = (Object o) -> prodMap.retrieveProducts(pxy);
		List<?> ls = (List<?>) f.apply(pxy);
		
		map.clear();
		map.put("s", "s");
		map.put("ls", ls);
		map.put("pxy", pxy);
		
		return map;
	}
}
