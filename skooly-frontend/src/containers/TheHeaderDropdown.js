import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../assets/images/default-avatar.png';
import { switchRole } from 'src/store/global';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.global);

  const changeRole = (role) => {
    dispatch(switchRole(role));
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={defaultAvatar} className="c-avatar-img" alt="admin" />
          <span className="ml-2">
            {role === 'admin' ? 'Admin' : 'Registrar'}
          </span>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {role === 'registrar' ? (
          <CDropdownItem onClick={() => changeRole('admin')}>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Switch to Admin
          </CDropdownItem>
        ) : (
          <CDropdownItem onClick={() => changeRole('registrar')}>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Switch to Registrar
          </CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
