package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface ProductMapper {
	public void registProduct(Product pro);
	public List<Product> bringProductList(Map<?,?> m);
	public List<Product> retrieveProducts(Map<?,?> m);
	public Product retrieveProduct(Product pro);
	public int countProduct(Map<?,?> m);
	public void modifyProduct(Product pro);
	public void removeProduct(Product pro);
}
