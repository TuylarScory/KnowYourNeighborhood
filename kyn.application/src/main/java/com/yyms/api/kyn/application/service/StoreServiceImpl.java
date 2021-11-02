package com.yyms.api.kyn.application.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yyms.api.kyn.application.dao.Stores;
import com.yyms.api.kyn.application.repository.StoresRepository;

@Service
@Transactional
public class StoreServiceImpl implements StoreService{

	@Autowired
	private StoresRepository storeRepo;
	
	@Override
	public List<Stores> viewStores() {
		
		return storeRepo.findAll();
		
	}

	@Override
	public List<Stores> searchByKey(String key) {
		
		return storeRepo.searchByKey(key);
		
	}

	@Override
	public Optional<Stores> getStoresId(int sid) {
		
		return storeRepo.findById(sid);
		
	}

}
