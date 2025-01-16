import background from '../background-compressed.jpg';
import cn from 'classnames';

import styles from './SpeedDial.module.css';
import { SiteList } from '@/components/SiteList';
import RegisterServiceWorker from '@/components/RegisterServiceWorker';
import DynamicNoSRRClock from '@/components/DynamicNoSRRClock';

export default function Index() {
  return (
    <main
      className='w-screen h-screen flex flex-col bg-no-repeat bg-center bg-cover overflow-x-hidden'
      style={{
        backgroundImage: `url(${background.src})`,
        boxShadow: 'inset 0px 0px 200px 16px rgba(0,0,0,0.75)',
      }}
    >
      <div className='p-4 h-full flex flex-col justify-between'>
        <div className={cn(styles.grid)}>
          <SiteList />
        </div>
        <div className={styles.footer}>
          <div className='w-full flex justify-between col-span-full'>
            <DynamicNoSRRClock />
          </div>
        </div>
      </div>
      <RegisterServiceWorker />
    </main>
  );
}
