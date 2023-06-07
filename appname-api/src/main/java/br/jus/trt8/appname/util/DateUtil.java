package br.jus.trt8.appname.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import br.jus.trt8.core.properties.CoreProperties;

@Component
public class DateUtil {

  @Autowired
  private CoreProperties appProperties;

  public LocalDateTime now() {
    LocalDateTime ldt = LocalDateTime.now();
    ZoneId zone = ZoneId.of(appProperties.getTimeZone());//
    ZonedDateTime zonedDateTime = ZonedDateTime.of(ldt, zone);
    return zonedDateTime.toLocalDateTime();
  }

  public LocalDateTime endOfTheDay() {
    LocalDateTime ldt = LocalDate.now().atTime(23, 59, 59);
    ZoneId zone = ZoneId.of(appProperties.getTimeZone());
    ZonedDateTime zonedDateTime = ZonedDateTime.of(ldt, zone);

    return zonedDateTime.toLocalDateTime();
  }

  public LocalDateTime beginOfTheDay() {
    LocalDateTime ldt = LocalDate.now().atTime(0, 0, 1);
    ZoneId zone = ZoneId.of(appProperties.getTimeZone());
    ZonedDateTime zonedDateTime = ZonedDateTime.of(ldt, zone);

    return zonedDateTime.toLocalDateTime();
  }

  public LocalDate today() {
    LocalDateTime ldt = LocalDateTime.now();
    ZoneId zone = ZoneId.of(appProperties.getTimeZone());
    ZonedDateTime zonedDateTime = ZonedDateTime.of(ldt, zone);

    return zonedDateTime.toLocalDate();
  }

}
