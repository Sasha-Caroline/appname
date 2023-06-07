package br.jus.trt8.appname.controladores;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.jus.trt8.appname.modelo.dtos.ProjetoDTO;
import br.jus.trt8.appname.modelo.entidades.Projeto;
import br.jus.trt8.appname.modelo.mappers.ProjetoMapper;
import br.jus.trt8.appname.servicos.ProjetoService;
import br.jus.trt8.core.controladores.CrudRestApi;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@RestController
@RequestMapping(ProjetoApi.PATH)
public class ProjetoApi implements CrudRestApi<Projeto, ProjetoService, ProjetoDTO, ProjetoMapper> {

  public static final String PATH = "/projeto";

  @NonNull
  private ProjetoService service;
  @NonNull
  private ProjetoMapper mapper;

  @Override
  public String getRequestMappingPath() {
    return PATH;
  }

}
