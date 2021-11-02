package com.yyms.api.kyn.application.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yyms.api.kyn.application.dao.Stores;
import com.yyms.api.kyn.application.service.StoreService;


@RestController
@RequestMapping(value = "/kyn")
public class StoreController {
	
	@Autowired
	private StoreService storeService;
	
	@GetMapping("/view-store")
	@PreAuthorize("hasRole('USER')")
	public List<Stores> viewStores() {
		
		List<Stores> store = storeService.viewStores();
				
		return store;
		
	}
	
	@GetMapping("/store/search/{key}")
	@PreAuthorize("hasRole('USER')")
	public List<Stores> searchByKey(@PathVariable String key) {
		
		return storeService.searchByKey(key);
		
	}
	
	@GetMapping("/store/{sid}")
	@PreAuthorize("hasRole('USER')")
	public Optional<Stores> getStoresId(@PathVariable int sid) {
		
		return storeService.getStoresId(sid);
		
	}

}
