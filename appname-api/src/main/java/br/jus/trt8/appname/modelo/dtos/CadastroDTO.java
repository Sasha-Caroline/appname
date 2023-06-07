package br.jus.trt8.appname.modelo.dtos;

import br.jus.trt8.appname.modelo.entidades.Cadastro;

import jakarta.validation.constraints.Size;
//import lombok.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.nio.file.LinkOption;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class CadastroDTO {
    private static final long serialVersionID = 1L;

  @ToString.Include
  @Size(max = 255)
  private String Nome;
  private String Email;

}
