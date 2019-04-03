package com.bit_etland.web.prod;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bit_etland.web.cmm.Proxy;

@Repository
public interface ProductMapper {
	public void registProduct(Product pro);
	public List<?> bringProductList(Proxy pxy);
	public List<Product> retrieveProducts(Map<?,?> m);
	public Product retrieveProduct(Product pro);
	public int countProduct();
	public void modifyProduct(Product pro);
	public void removeProduct(Product pro);
}
