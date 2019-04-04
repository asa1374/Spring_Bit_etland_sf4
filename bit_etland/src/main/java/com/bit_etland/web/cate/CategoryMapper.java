package com.bit_etland.web.cate;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;
@Repository
public interface CategoryMapper {
	public void registCategory(Category cate);
	public List<?> bringCategoryList(Proxy pxy);
	public List<Category> retrieveCategories(Map<?,?> m);
	public String txCategory(String categoryName);
	public int countCategory();
	public void modifyCategory(Category cate);
	public void removeCategory(Category cate);
}
