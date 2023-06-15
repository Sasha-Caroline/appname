package br.jus.trt8.appname.modelo.entidades;

import br.jus.trt8.core.modelo.EntidadeBase;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "CADASTRO",
         uniqueConstraints = {@UniqueConstraint(columnNames = {"EMAIL"}, name = "CADASTRO_PK")})
@SequenceGenerator(name = EntidadeBase.SEQUENCE_GENERATOR, sequenceName = "SEQ_CADASTRO",
  initialValue = 1, allocationSize = 1)
public class Cadastro extends EntidadeBase {

  private static final long seriaVersionUID = 1L;

  @NotBlank
  @Column(name = "NOME", length = 255)
  @ToString.Include
  private String nome;

  @NotBlank
  @Column(name = "EMAIL", length = 255)
  @ToString.Include
  private String email;


}
