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
	
	public void carryOut(Map<?,?> paramMap) {
		
		pageNum = (paramMap.get("pageNum")==null)?1: Integer.parseInt((String) paramMap.get("pageNum"));
		pageSize = (paramMap.get("pageSize")==null)?5: Integer.parseInt((String) paramMap.get("pageSize"));
		blockSize = (paramMap.get("blockSize")==null)?5:Integer.parseInt((String) paramMap.get("blockSize"));
		
		totalCount = (int) paramMap.get("totalCount");
		
		startRow = pageSize*(pageNum-1);
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
		existnext = (pageCount<(startPage + pageSize))?false:true;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;
	}
}
