package com.mf.hybridesender;

import com.mf.hybridesender.controller.DocumentController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackageClasses = DocumentController.class)
public class HybridesenderApplication {

	public static void main(String[] args) {
		SpringApplication.run(HybridesenderApplication.class, args);
	}

}
