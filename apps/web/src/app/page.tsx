import Image from 'next/image';
import { Button } from '@repo/ui/button';
import { LogoutButton } from '@/components/auth/buttons';
import Chessboard from '@/components/chess/board';
import { H3, H4, P } from '@repo/ui/typography';

export default function Page(): JSX.Element {
    return (
        <main className="bg-background min-h-screen flex items-center py-2">
            <div
                className={'w-full flex items-center justify-center gap-4 p-4'}
            >
                <div className={'flex flex-col gap-4'}>
                    <div className={'col-span-2 flex items-center gap-2'}>
                        <Image
                            src={'/images/coach.svg'}
                            alt={'Isometric chess board'}
                            priority
                            width={56}
                            height={56}
                            className={
                                'rounded-lg bg-yellow-400 aspect-square w-16 h-16 pt-1'
                            }
                        />

                        <div className={'flex flex-col justify-center text-sm'}>
                            <div className={''}>
                                <P className={'font-semibold'}>Coach Nelson</P>
                                <div className={'text-xs '}>Coach</div>
                            </div>

                            <P>(1300)</P>
                        </div>
                    </div>

                    <div className={'relative max-w-2xl w-full'}>
                        <Chessboard />
                    </div>

                    <div
                        className={
                            'col-span-2 flex flex-row-reverse justify-start items-center gap-2'
                        }
                    >
                        <Image
                            src={'/images/coach.svg'}
                            alt={'Isometric chess board'}
                            priority
                            width={56}
                            height={56}
                            className={
                                'rounded-lg bg-green-600 aspect-square w-16 h-16 pt-1'
                            }
                        />

                        <div
                            className={
                                'flex flex-col justify-center items-end text-sm'
                            }
                        >
                            <div className={''}>
                                <P className={'font-semibold'}>You</P>
                            </div>

                            <P>(1300)</P>
                        </div>
                    </div>

                    <div className={'flex flex-col gap-4'}>
                        <H3>Chess</H3>
                        <P>
                            Play a game of chess against the computer. The
                            computer will make random moves.
                        </P>
                        <LogoutButton />
                    </div>
                </div>

                <div
                    className={
                        'max-w-2xl flex flex-col gap-4 self-start bg-white rounded-lg p-4 h-full w-full'
                    }
                >
                    <H3>Insights</H3>

                    <div className={'flex gap-4'}>
                        <div
                            className={
                                'bg-purple-200 text-sm text-purple-900 rounded-lg p-4 h-full w-full flex flex-col gap-2'
                            }
                        >
                            <H4>Opening</H4>
                            <P>
                                <b>Caro-Kann Defense - Advance Variation</b>
                            </P>

                            <P>
                                You played the Caro-Kann Defense - Advance
                                Variation. This opening is a solid choice for
                                black. It aims to control the center of the
                                board and develop the pieces.
                            </P>

                            <P>
                                You played this opening <b>73%</b> of the time.
                            </P>

                            <div>
                                <div className={'flex-1 h-2'}>
                                    <div
                                        className={
                                            'bg-purple-300 h-full w-3/4 rounded-full'
                                        }
                                    ></div>
                                </div>
                            </div>

                            <hr className={'border-purple-300'} />

                            <P>
                                <b>1. e4 c6</b>
                                <br />
                                <b>2. d4 d5</b>
                                <br />
                                <b>3. e5</b>
                            </P>
                        </div>

                        <div
                            className={
                                'bg-neutral-100 text-sm rounded-lg p-4 h-full w-full flex flex-col gap-2'
                            }
                        >
                            <H4>Tactics</H4>
                            <P>
                                You have a <b>50%</b> success rate in solving
                                tactics.
                            </P>

                            <hr className={'border-neutral-300'} />

                            <P>
                                <b>Success rate:</b> 50%
                            </P>
                            <P>
                                <b>Time taken:</b> 2 minutes
                            </P>
                            <P>
                                <b>Rating:</b> 1300
                            </P>

                            <Button
                                variant={'link'}
                                className={'text-primary w-fit h-fit p-0'}
                            >
                                View more
                            </Button>
                        </div>
                    </div>

                    <div
                        className={
                            'bg-neutral-100 rounded-lg p-4 h-full w-full'
                        }
                    ></div>
                </div>
            </div>
        </main>
    );
}
