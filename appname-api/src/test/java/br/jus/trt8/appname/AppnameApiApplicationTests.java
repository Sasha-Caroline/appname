package br.jus.trt8.appname;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.TimeZone;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AppNameApiApplicationTests {

  @Value("${spring.jackson.time-zone}")
  private String timeZone;

  @Test
  void contextLoads() {}

  @Test
  void timezoneTest() {
    TimeZone tz = TimeZone.getDefault();
    assertEquals(timeZone, tz.getID());
  }

}
