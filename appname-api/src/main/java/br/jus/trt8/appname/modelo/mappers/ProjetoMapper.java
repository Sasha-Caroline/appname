package br.jus.trt8.appname.modelo.mappers;

import org.mapstruct.Mapper;
import br.jus.trt8.appname.modelo.dtos.ProjetoDTO;
import br.jus.trt8.appname.modelo.entidades.Projeto;
import br.jus.trt8.core.modelo.EntidadeBaseMapper;

@Mapper
public interface ProjetoMapper extends EntidadeBaseMapper<Projeto, ProjetoDTO> {


}
