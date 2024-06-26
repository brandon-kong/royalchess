import Image from 'next/image';
import { Button } from '@repo/ui/button';
import { LogoutButton } from '@/components/auth/buttons';
import Chessboard from '@/components/chess/board';
import { H3, H4, P } from '@repo/ui/typography';

import {
    FontAwesomeIcon,
    faChessRook,
    faCompass,
    faExclamation,
    faExclamationCircle,
} from '@repo/ui/icons';

export default function Page(): JSX.Element {
    return (
        <main className="bg-background min-h-screen flex items-center py-2">
            <div
                className={
                    'w-full flex max-lg:flex-col xl:flex-row items-center justify-center gap-4 p-4'
                }
            >
                <div className={'flex flex-col gap-4 self-start'}>
                    <div className={'flex items-center gap-2'}>
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
                        'max-w-2xl flex flex-col gap-4 max-lg:self-center self-start bg-white rounded-lg p-4 h-full w-full'
                    }
                >
                    <H3>Insights</H3>

                    <div
                        className={
                            ' max-lg:flexx flex-col xl:grid max-lg:grid-cols-1 xl:grid-cols-2 gap-4 max-xl:space-y-4'
                        }
                    >
                        <div className={'flex gap-4 col-span-1 row-span-2'}>
                            <div
                                className={
                                    'bg-purple-100 text-sm text-purple-900 rounded-lg p-4 h-full w-full flex flex-col gap-2'
                                }
                            >
                                <div className={'flex items-center gap-2'}>
                                    <FontAwesomeIcon
                                        icon={faChessRook}
                                        className={'stroke-current w-6 h-6'}
                                    />

                                    <H4>Opening</H4>
                                </div>

                                <P>
                                    <b>Caro-Kann Defense - Advance Variation</b>
                                </P>

                                <P>
                                    Solid choice for Black, aiming for central
                                    control and piece development.
                                </P>

                                <P>
                                    <b>1. e4 c6</b>
                                    <br />
                                    <b>2. d4 d5</b>
                                    <br />
                                    <b>3. e5</b>
                                </P>

                                <Button
                                    variant={'link'}
                                    className={
                                        'text-current w-fit h-fit p-0 underline my-2'
                                    }
                                >
                                    View more
                                </Button>

                                <hr className={'border-purple-300'} />

                                <H4>Performance</H4>

                                <P>
                                    You played this opening <b>73%</b> of the
                                    time.
                                </P>

                                <div
                                    className={
                                        'my-2 w-full h-2 bg-purple-300 rounded-full overflow-hidden'
                                    }
                                >
                                    <div
                                        className={'w-1/2 h-full bg-purple-600'}
                                    ></div>
                                </div>

                                <P>
                                    <b>Win rate:</b> 50%
                                </P>

                                <P>
                                    <b>Loss rate:</b> 25%
                                </P>
                            </div>
                        </div>

                        <div
                            className={
                                ' bg-neutral-100 text-sm rounded-lg p-4 w-full flex flex-col gap-2'
                            }
                        >
                            <div className={'flex items-center gap-2'}>
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className={'stroke-current w-6 h-6'}
                                />

                                <H4>Tactics</H4>
                            </div>
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

                            <div
                                className={
                                    'w-full justify-between flex items-center gap-4'
                                }
                            >
                                <Button
                                    variant={'link'}
                                    className={
                                        'text-current w-fit h-fit p-0 underline my-2'
                                    }
                                >
                                    View more
                                </Button>

                                <Button variant={'outline'} size={'sm'}>
                                    Practice tactics
                                </Button>
                            </div>
                        </div>

                        <div
                            className={
                                'bg-red-100 text-red-700 text-sm rounded-lg p-4 w-full flex flex-col gap-2'
                            }
                        >
                            <div className={'flex items-center gap-2'}>
                                <FontAwesomeIcon
                                    icon={faExclamationCircle}
                                    className={'stroke-current w-6 h-6'}
                                />

                                <H4>Shortcomings</H4>
                            </div>
                            <P>You missed an opportunity to win a bishop.</P>

                            <hr className={'border-red-300'} />

                            <P>
                                By playing <b>Qd4</b> instead of <b>Qd3</b>, you
                                could have won a bishop by pinning the knight to
                                the king.
                            </P>

                            <div
                                className={
                                    'h-full w-full justify-between flex items-center gap-4'
                                }
                            >
                                <Button
                                    variant={'link'}
                                    className={
                                        'text-current w-fit h-fit p-0 underline my-2'
                                    }
                                >
                                    View more
                                </Button>

                                <Button variant={'outline'} size={'sm'}>
                                    Open analysis
                                </Button>
                            </div>
                        </div>

                        <div
                            className={
                                'bg-neutral-100 rounded-lg p-4 h-full w-full flex-1 flex gap-4 col-span-2'
                            }
                        >
                            <Image
                                src={'/images/coach.svg'}
                                alt={'Isometric chess board'}
                                width={56}
                                height={56}
                                className={
                                    'rounded-lg bg-neutral-600 aspect-square w-16 h-16 pt-1'
                                }
                            />

                            <div
                                className={
                                    'flex flex-col justify-center text-sm self-start'
                                }
                            >
                                <div className={''}>
                                    <P className={'font-semibold'}>
                                        Coach Nelson
                                    </P>
                                </div>

                                <P className={'text-neutral-900'}>
                                    You are really close to winning the game.
                                    Try to find the best move.
                                </P>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
