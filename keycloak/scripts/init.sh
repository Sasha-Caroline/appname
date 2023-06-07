#!/bin/sh

init()
{					
	echo ">>>>>>>>>>>>>>>>  CONFIGURANDO O KEYCLOAK  <<<<<<<<<<<<<<<<<<<<"		
	while :
	do						
		if (curl -s -f -S http://0.0.0.0:8080/auth)
		then			
			echo "Configurando credenciais no Keycloak Admin Console..."
			kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --password admin --config ./tmp/kcadm.config

			#realmJaConfigurado=$(kcadm.sh get realms/TRT8_DEV -H --config ./tmp/kcadm.config | grep 'HTTP/1.1' | grep -Eo '[0-9]{3}')
			#if ((realmJaConfigurado==404)); 
			#then 			
				echo "Criando o Realm TRT8_DEV..."				
				kcadm.sh create realms -f ./import/realm.json --config ./tmp/kcadm.config								
				
				echo "Configurando Clients da Aplicação..."				
				kcadm.sh create clients -r TRT8_DEV -f ./import/appname-ui.json --config ./tmp/kcadm.config
				
				echo "Sincronizando usuários..."
				kcadm.sh create user-storage/16618614-798b-46c4-a4e1-239928d03d16/sync -r TRT8_DEV -q action=triggerFullSync --config ./tmp/kcadm.config			
			#else
				#echo "Não foi preciso criar o Realm TRT8_DEV, pois ele já havia sido criado anteriormente..."
			#fi
			
			break;
		fi
		sleep 5
	done
	echo ">>>>>>>>>>>>>>>>  CONFIGURAÇÃO DO KEYCLOAK REALIZADA COM SUCESSO  <<<<<<<<<<<<<<<<<<<<"		
	touch /tmp/keycloak_configured
}

echo “Iniciando processo em background para configurar o Keycloak”
init & disown
echo “Processo em background para configurar o Keycloak Iniciado”