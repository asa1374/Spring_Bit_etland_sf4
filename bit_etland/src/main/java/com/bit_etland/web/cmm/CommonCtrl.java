package com.bit_etland.web.cmm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonCtrl {
	
	private static final Logger logger = LoggerFactory.getLogger(CommonCtrl.class);
	
	@GetMapping("/")
	public String home() {
		logger.info("Welcome home! 루트 진입");	
		System.out.println("루트 진입");
		return "index";
	}
}
