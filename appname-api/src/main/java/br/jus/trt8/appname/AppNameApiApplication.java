package br.jus.trt8.appname;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@EnableConfigurationProperties
@ConfigurationPropertiesScan("br.jus.trt8.appname.configuracoes.propriedades")
public class AppNameApiApplication extends SpringBootServletInitializer {

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(AppNameApiApplication.class);
  }

  public static void main(String[] args) {
    SpringApplication.run(AppNameApiApplication.class, args);
  }

}
