package br.jus.trt8.appname.controladores;

import br.jus.trt8.appname.modelo.dtos.CadastroDTO;
import br.jus.trt8.appname.modelo.entidades.Cadastro;
import br.jus.trt8.appname.modelo.mappers.CadastroMapper;
import br.jus.trt8.appname.servicos.CadastroService;
import br.jus.trt8.core.controladores.CrudRestApi;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Getter
@RequiredArgsConstructor
@RestController
@RequestMapping(CadastroApi.PATH)
public class CadastroApi implements CrudRestApi<Cadastro, CadastroService, CadastroDTO, CadastroMapper> {

  public static final String PATH = "/cadastro";

  @NonNull
  private CadastroService service;
  @NonNull
  private CadastroMapper mapper;

  @Override
  public String getRequestMappingPath() {
    return PATH;
  }
}
