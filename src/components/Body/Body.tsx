import { useEffect, useState } from 'react';

import { api } from '../../services/api';

interface UserUnit {
    unitId: number;
}

export default function Body(){
    const [usersUnit, setUsersUnit] = useState<UserUnit[]>([]);

    useEffect(() => {
        api.get<UserUnit[]>('/users').then(response => {
            setUsersUnit(response.data);
        })
    });
    const result = usersUnit.reduce(function (acumulador, objetoAtual){
        return acumulador + objetoAtual.unitId;
      }, 0);

    return(
        <>
            {result}
        </>
    )
}