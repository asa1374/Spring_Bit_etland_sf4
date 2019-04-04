package com.bit_etland.web.supp;

import java.util.List;
import java.util.Map;

import com.bit_etland.web.cmm.Proxy;

public interface SupplierMapper {
	public void registSupplier(Supplier supp);
	public List<?> bringSupplierList(Proxy pxy);
	public List<Supplier> retrievesuppgories(Map<?,?> m);
	public String txSupplier(String supplierName);
	public int countSupplier();
	public void modifySupplier(Supplier supp);
	public void removeSupplier(Supplier supp);
}
