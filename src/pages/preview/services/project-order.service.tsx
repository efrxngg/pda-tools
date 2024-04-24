import {ProjectOrder} from '../../home/interfaces/ProjectOrder.ts';
import {ITag} from '../interfaces/i-tag.ts';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BusinessIcon from '@mui/icons-material/Business';

export class ProjectOrderService {
  getTags({project, order}: ProjectOrder) {
    const {
      electronicSignatureFlow,
      distributor, seller,
      fmcSale, changeFmcOffer, supplementarySale,
      bank, olderAdult, convergent, invoice, customerDisability
    }
      = order.customer;

    const tags = [];

    const generalFlagsMetadata = [];
    let typeSale = 'Bug';
    const electronicSignature = electronicSignatureFlow ? 'Firma Electrónica' : '';

    if (fmcSale) {
      typeSale = 'Venta Nueva';
    }

    if (changeFmcOffer) {
      typeSale = 'Cambio de Oferta';
    }

    if (supplementarySale) {
      typeSale = 'Posventa Supplementria';
    }

    if (bank) {
      generalFlagsMetadata.push('Bancarizado');
    }

    if (olderAdult) {
      generalFlagsMetadata.push('Adulto Mayor');
    }

    if (convergent) {
      generalFlagsMetadata.push('Convergente');
    }

    if (customerDisability) {
      generalFlagsMetadata.push('Discapacidad');
    }

    if (invoice) {
      generalFlagsMetadata.push('Factura Competencia');
    }

    const carousel = order.customer.installAddress.formatedAddress.reference.startsWith('CARRUSEL: ') ? 'Carrusel' : '';
    const generalTag: ITag = {
      name: 'Tags',
      metadata: [typeSale, ...generalFlagsMetadata, electronicSignature, carousel],
      icon: <FormatListBulletedIcon style={{fontSize: '1.2em'}}/>
    };
    tags.push(generalTag);

    const customerId = project.id_customer;
    const customerTag: ITag = {
      name: 'Cliente',
      metadata: [customerId],
      icon: <PersonIcon style={{fontSize: '1.2em'}}/>
    };
    tags.push(customerTag);

    const username = project.executive;
    const usernameTag: ITag = {
      name: 'Usuario',
      metadata: [username],
      icon: <PermIdentityIcon style={{fontSize: '1.2em'}}/>
    };
    tags.push(usernameTag);


    if (distributor && seller) {
      const distributorName = String(distributor);
      const sellerName = String(seller);
      const saleTag: ITag = {
        name: 'Distrib/Vend',
        metadata: [distributorName, sellerName],
        icon: <BusinessIcon style={{fontSize: '1.2em'}}/>
      };
      tags.push(saleTag);
    }


    return tags;
  }
}

