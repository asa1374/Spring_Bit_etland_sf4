package com.bit_etland.web.emp;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeMapper {
	public void registEmployee(Employee emp);
	public List<Employee> bringEmployeeList(Map<?,?> m);
	public List<Employee> selectCategoris(Map<?,?> m);
	public Employee selectEmployee();
	public int countEmployee(Map<?,?> m);
	public void modifyEmployee(Employee emp);
	public Map<String, Object> selectProfile(Map<?,?> m);
	public void removeEmployee(Employee emp);
	public Map<String, Object> selectPhone(Map<?,?> m);
}
