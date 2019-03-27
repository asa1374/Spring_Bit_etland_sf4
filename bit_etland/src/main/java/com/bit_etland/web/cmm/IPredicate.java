package com.bit_etland.web.cmm;


@FunctionalInterface
public interface IPredicate {
	public boolean test(Object o);
}