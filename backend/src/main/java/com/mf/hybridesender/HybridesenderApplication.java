package com.mf.hybridesender;

import com.mf.hybridesender.controller.DocumentController;
import com.mf.hybridesender.services.PdfReader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class HybridesenderApplication {

	public static void main(String[] args) {
		SpringApplication.run(HybridesenderApplication.class, args);
	}

}
