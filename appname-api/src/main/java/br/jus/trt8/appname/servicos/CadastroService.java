package br.jus.trt8.appname.servicos;

import br.jus.trt8.appname.modelo.entidades.Cadastro;
import br.jus.trt8.appname.repositorios.CadastroRepository;
import br.jus.trt8.core.servicos.CrudService;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Getter
@RequiredArgsConstructor
@Service
public class CadastroService implements CrudService<Cadastro, CadastroRepository> {

  @NonNull
  private CadastroRepository repository;
}
