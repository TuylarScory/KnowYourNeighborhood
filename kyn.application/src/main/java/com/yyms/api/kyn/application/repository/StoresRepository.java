package com.yyms.api.kyn.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.yyms.api.kyn.application.dao.Stores;

@Repository
public interface StoresRepository extends JpaRepository<Stores, Integer>{
	
	@Query(value = "SELECT s FROM Stores s WHERE s.storeName LIKE '%' || :key || '%' "
			+ "OR s.contact LIKE '%' || :key || '%' "
			+ "OR s.location LIKE '%' || :key || '%' "
			+ "OR s.openHour LIKE '%' || :key || '%' ")
	
	public List<Stores> searchByKey(@Param("key") String key);

}
