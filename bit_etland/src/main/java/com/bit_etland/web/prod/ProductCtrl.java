package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bit_etland.web.cate.Category;
import com.bit_etland.web.cate.CategoryMapper;
import com.bit_etland.web.cmm.IConsumer;
import com.bit_etland.web.cmm.IFunction;
import com.bit_etland.web.cmm.ISupplier;
import com.bit_etland.web.cmm.PrintService;
import com.bit_etland.web.cmm.Proxy;
import com.bit_etland.web.cmm.Users;
import com.bit_etland.web.supp.Supplier;
import com.bit_etland.web.supp.SupplierMapper;

@RestController
public class ProductCtrl {
private static final Logger logger = LoggerFactory.getLogger(ProductCtrl.class);
	
	@Autowired Product prod;
	@Autowired Category cate;
	@Autowired Supplier supp;
	@Autowired PrintService ps;
	@Autowired ProductMapper prodMap;
	@Autowired CategoryMapper cateMap;
	@Autowired SupplierMapper suppMap;
	@Autowired Map<String, Object> map;
	@Autowired Users<?> users;
	@Autowired Proxy pxy;
	@Resource(name = "uploadPath") private String uploadPath;
	
	@Transactional
	@PostMapping("/phones")
	public Map<?,?> regist(
			@RequestBody Product param) {
		System.out.println("프로덕트 레지스트 진입");
		
		IFunction f = s -> cateMap.txCategory((String) s);
		String c = (String) f.apply(param.getCategoryID());
		
		IFunction ff = s -> suppMap.txSupplier((String) s);
		String s = (String) ff.apply(param.getSupplierID());
		
		param.setCategoryID(c);
		param.setSupplierID(s);

		IConsumer i = o -> prodMap.registProduct((Product) o);
		i.accept(param);
		
		map.clear();
		map.put("s", "s");
		return map;
	}
	@PostMapping("/phones/files")
	public Map<?,?> fileupload(
			@RequestBody MultipartFile file)throws Exception{
		ps.accept("넘어온 파일명"+file.getName());
		return null;
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