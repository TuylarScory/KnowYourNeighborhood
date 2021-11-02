package com.yyms.api.kyn.application.service;

import java.util.List;
import java.util.Optional;

import com.yyms.api.kyn.application.dao.Stores;

public interface StoreService {
	
	public List<Stores> viewStores();
	
	public List<Stores> searchByKey(String key);
	
	public Optional<Stores> getStoresId(int sid);

}
