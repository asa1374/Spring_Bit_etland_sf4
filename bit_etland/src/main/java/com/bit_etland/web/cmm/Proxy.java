package com.bit_etland.web.cmm;

import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component @Data @Lazy
public class Proxy {
	
	private int pageNum, pageSize, blockSize,totalCount,blockNum,
	startRow,endRow,startPage,endPage,prevBlock,nextBlock,pageCount;
	private boolean existPrev, existnext;
	
	public void carryOut(Map<?,?> pramMap) {
		

		
		pageSize = (pramMap.get("page_size")==null)?5: Integer.parseInt((String) pramMap.get("page_size"));
		pageNum = (pramMap.get("page_num")==null)?1:Integer.parseInt((String)pramMap.get("page_num"));
		blockSize = (pramMap.get("block_size")==null)?5:Integer.parseInt((String)pramMap.get("block_size"));
		blockNum = (pramMap.get("block_num")==null)?0:Integer.parseInt((String)pramMap.get("block_num"));
		
		totalCount = Integer.parseInt((String)pramMap.get("totalCount"));
		
		startRow = pageSize*(pageNum-1)+1;
		endRow = pageNum * pageSize;
		endRow = (totalCount > endRow)?endRow:totalCount;
		pageCount = totalCount/pageSize;
		if(totalCount%pageSize!=0) {
			pageCount++;
		}
		blockNum = (int)Math.floor((pageNum-1)/ blockSize);
		startPage = blockNum*blockSize+1;
		endPage = startPage+(blockSize-1);
		if(endPage>pageCount) {
			endPage=pageCount;
		}
		existPrev = (blockSize>=pageNum)?false:true;
		existnext = (pageCount<=(startPage + pageSize))?false:true;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;
		System.out.println(totalCount);
		System.out.println("pageCountpageCount       "+pageCount);
		System.out.println("startPage + pageSize       "+startPage + pageSize);
		System.out.println("프리"+existPrev);
		System.out.println(existnext);
}
}
