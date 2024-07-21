import { useBetween } from 'src/hooks/useBetween';
import useMoneyInvitations from '../hooks/useMoneyInvitations';
import { MyCheckbox } from '../../../../_components/reuse/my-checkbox';
import { IEntityInvitation } from '../entity-invitation-type';

const AcceptedInvitations = () => {
  const { invitations, toggleInvitationSelection } =
    useBetween(useMoneyInvitations);

  return (
    <div>
      <div style={{ marginTop: '30px' }} className="flex fwrap fcenter">
        {invitations?.map((el: IEntityInvitation) => (
          <div
            className="mycardFilter"
            style={{ marginLeft: '1px', marginTop: '1px' }}
            key={el.name}
          >
            <MyCheckbox
              css="checkbox"
              id={el._id}
              onChange={() => toggleInvitationSelection(el)}
              label={el.name}
              value={el.selected}
              checked={el.selected}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AcceptedInvitations;
