package br.jus.trt8.appname.modelo.mappers;

import br.jus.trt8.appname.modelo.dtos.CadastroDTO;
import br.jus.trt8.appname.modelo.entidades.Cadastro;
import br.jus.trt8.core.modelo.EntidadeBaseMapper;
import org.mapstruct.Mapper;

@Mapper
public interface CadastroMapper extends EntidadeBaseMapper<Cadastro, CadastroDTO> {
}
