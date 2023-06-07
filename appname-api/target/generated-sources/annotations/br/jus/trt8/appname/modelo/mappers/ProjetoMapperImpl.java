package br.jus.trt8.appname.modelo.mappers;

import br.jus.trt8.appname.modelo.dtos.ProjetoDTO;
import br.jus.trt8.appname.modelo.entidades.Projeto;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-31T13:20:14-0300",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class ProjetoMapperImpl implements ProjetoMapper {

    @Override
    public Projeto paraEntidade(ProjetoDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Projeto.ProjetoBuilder<?, ?> projeto = Projeto.builder();

        projeto.id( dto.getId() );
        projeto.titulo( dto.getTitulo() );

        return projeto.build();
    }

    @Override
    public ProjetoDTO paraDTO(Projeto entidade) {
        if ( entidade == null ) {
            return null;
        }

        ProjetoDTO.ProjetoDTOBuilder<?, ?> projetoDTO = ProjetoDTO.builder();

        projetoDTO.id( entidade.getId() );
        projetoDTO.titulo( entidade.getTitulo() );

        return projetoDTO.build();
    }

    @Override
    public List<Projeto> paraEntidades(List<ProjetoDTO> dto) {
        if ( dto == null ) {
            return null;
        }

        List<Projeto> list = new ArrayList<Projeto>( dto.size() );
        for ( ProjetoDTO projetoDTO : dto ) {
            list.add( paraEntidade( projetoDTO ) );
        }

        return list;
    }

    @Override
    public List<ProjetoDTO> paraDTOs(List<Projeto> entidade) {
        if ( entidade == null ) {
            return null;
        }

        List<ProjetoDTO> list = new ArrayList<ProjetoDTO>( entidade.size() );
        for ( Projeto projeto : entidade ) {
            list.add( paraDTO( projeto ) );
        }

        return list;
    }
}
