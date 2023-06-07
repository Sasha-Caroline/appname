package br.jus.trt8.appname.modelo.entidades;

import br.jus.trt8.core.modelo.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.nio.file.attribute.FileAttribute;

@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "CADASTRO")
public class Cadastro extends EntidadeBase {

  private static final long seriaVersionUID = 1L;

  @NotBlank
  @Column(name = "Nome", length = 255)
  @ToString.Include
  private String Nome;
  
  @NotBlank
  @Column(name = "Email", length = 255)
  @ToString.Include
  private String Email;


}
