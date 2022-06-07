// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useParams } from 'react-router-dom';

import ErrorResult from '../../components/error-result/ErrorResult';
import Longtext from '../../components/longtext/Longtext';
import OwnedObjects from '../../components/ownedobjects/OwnedObjects';
import TxForID from '../../components/transactions-for-id/TxForID';
import theme from '../../styles/theme.module.css';
import { IS_STATIC_ENV } from '../../utils/envUtil';

type DataType = {
    id: string;
    objects: ResponseType;
    loadState?: 'loaded' | 'pending' | 'fail';
};

type ResponseType = {
    objectId: string;
}[];

function instanceOfDataType(object: any): object is DataType {
    return object !== undefined && ['id', 'objects'].every((x) => x in object);
}

function AddressResult() {
    const { id: addressID } = useParams();

    if (addressID !== undefined) {
        return (
            <div className={theme.textresults} id="textResults">
                <div>
                    <div>Address</div>
                    <div id="addressID">
                        <Longtext
                            text={addressID}
                            category="addresses"
                            isLink={false}
                        />
                    </div>
                </div>
                {!IS_STATIC_ENV && (
                    <TxForID id={addressID} category="address" />
                )}
                <div>
                    <div>Owned Objects</div>
                    <div>
                        {<OwnedObjects id={addressID} byAddress={true} />}
                    </div>
                </div>
                <TxForID id={addressID} category="address" />
            </div>
        );
    } else {
        return <ErrorResult id={addressID} errorMsg={'Something went wrong'} />;
    }
}

export default AddressResult;
export { instanceOfDataType };
