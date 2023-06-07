package br.jus.trt8.appname.modelo.entidades;


import br.jus.trt8.core.modelo.EntidadeBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "TB_PROJETO",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"TITULO"}, name = "TB_PROJETO_UK")})
@SequenceGenerator(name = EntidadeBase.SEQUENCE_GENERATOR, sequenceName = "SEQ_PROJETO",
        initialValue = 1, allocationSize = 1)
public class Projeto extends EntidadeBase {

    private static final long serialVersionUID = 1L;

    @NotBlank
    @Column(name = "TITULO", length = 255)
    @ToString.Include
    private String titulo;

}
