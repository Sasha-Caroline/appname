package br.jus.trt8.appname.configuracoes;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = {"br.jus.trt8.appname.modelo.entidades"})
@EnableJpaRepositories(basePackages = {"br.jus.trt8.appname.repositorios"})
public class AppConfig {
}
