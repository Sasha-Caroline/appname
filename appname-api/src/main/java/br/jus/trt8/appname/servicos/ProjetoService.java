package br.jus.trt8.appname.servicos;

import org.springframework.stereotype.Service;
import br.jus.trt8.appname.modelo.entidades.Projeto;
import br.jus.trt8.appname.repositorios.ProjetoRepository;
import br.jus.trt8.core.servicos.CrudService;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
@Service
public class ProjetoService implements CrudService<Projeto, ProjetoRepository> {

  @NonNull
  private ProjetoRepository repository;

}
