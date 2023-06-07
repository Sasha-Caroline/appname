package br.jus.trt8.appname.modelo.dtos;

import br.jus.trt8.appname.modelo.entidades.Projeto;
import br.jus.trt8.core.modelo.EntidadeBaseDTO;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;


@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
// @ApiModel(description = "Representação da entidade Projeto")
public class ProjetoDTO extends EntidadeBaseDTO<Projeto> {

  private static final long serialVersionUID = 1L;

  // @ApiModelProperty(value = "Título do Projeto")
  @ToString.Include
  @Size(max = 255)
  private String titulo;

}
