"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

const chips: string[] = ["All", "VCG", "Games", "Voucher", "Pulsa", "PLN"];
type productType = "VCG" | "Games" | "Voucher" | "Pulsa" | "PLN";
type game = {
    name: string;
    icon: string;
    type: productType | null | undefined;
};

const myGames: game[] = [
    {
        name: "FIFA 23",
        icon: "https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg",
        type: "Games",
    },
    {
        name: "FIFA 22",
        icon: "https://img.playstationtrophies.org/images/2021/09/15/icon/51ffb5d8587c0853567545404de35d6b-l.png",
        type: "Voucher",
    },
    {
        name: "FIFA 21",
        icon: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVFRgREhEYGBgYGBgYGBgYGBgYERgYGBgZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAAAQIHAwUGCAT/xABFEAACAQMBBgIGBgcFCAMAAAABAgADBBESBQYHEyExQVEUIjJhgZEXQlJxkqEjU1STsdLTFWKCorMkQ2WkssHD4whyg//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDckRECSyRAREQLJEsCSxEBERAREQJJLJApkgyGBYiMQAiJYHGxmIlaUQIYA8YxKIF0e+YykwIEiIgcmZZx5lBgZxJmIFiIgIiWAiIgIkiBYklgJJZMwJBiBAREQAlkEsDjMCGkBgWSZapBAmZcyZiAiIgWIlgBM5hLmBlEglgIklzARJECxJECyZkzLAZiIgIiICDEQERiIHGwOYmTZmJXpAZgGSAIFzEe+QmBYkyIgcsmJMyZgZzDWIAgrAyBmWZxoJnAExEQEmYEsDHMyia64g8SUsybW1C1LjsxPWnSJ8GA9p/7vh4+RD315d0qSmpWqJTUd2dlVB8WOJ5W74mbHpkqbwMR9inUdfxBdJ+Bngdm8PNp7SYXW1LlqYbqA41V9JwcLT6LSB8vD7M9lY8JNkoMPTqVT9p6rqflT0iB+q34obHYhfSypP2qdUD56cD4z1Gz9pULhddvWSqvmjqwHuOD0PuM8jdcKNkMpC0Hpn7SVXLD3jWWH5Txu1eFl7aN6Tsu6ZivULnl3AHTIDA6X7djpz2wYG6xLNU7j8TWdxZbTXl1gdAqkaAzDoUqr00Nnx6DwwPHasCxEQERECTFjMpiVHlAwJiU05iBAuZZJNUC4iTMQM8RJmMwKTJGYYwMqczmFOZwJGJYgSQyxA8VxO3sNhbYpNi4rZWn46QMa6mPcCAPew74M6LhTuOKartK7TVXqevSV+pRW6ioc93bv7gR4k48/tun/ae8Atm9ajRcU2HhooAvVVv/ALPrXPvHlNv7f2zSs6D3VY4VB0Ue0zHoiKPMnA/PsIHQ758QLfZ1RaL02qOylyqFRoXOFLE+J64Hu94nmvpttf2Ot+JJwvxisWOW2c5J7kmmT5dyJ2262/ttf3C21HZpBILO7cvSiL3dsDzIH3sIHabu7/UbqhXuzQejQoD1qjspDMBkqoHdsEfFgPGeh2Dteld0Kd1RPquucH2lYdGU+8EEH7pqviXtV7y5pbCsQMcwc3T0U1ME6W0/VRcs3fqPNZxbjX9XZG0Kmybpv0VVhofBCcxgBTqDyVxhT3wQBn1TA9ZxM3GS9pNcUFAuUXKkdOco+o3m2PZPw7Hp+PhDva9zSayuGJrUBlGb2npA6evmynAJ8ivjkzZU0dvTT/szbtK6T1adZlqP4IFqEpcD3/Wb3ahA3jLJEC5iSMwMSI0zEt17S6oGWmYlZdUHMDHEYmWmNMDHES4MkCgRiUCZQMCJOk5JiyQKomU40XBmcCxJGYCUSZjMDSnCn1ts3rt7Wi4Pvy1zTyfz/Oe+4j7yJZWhchWquStBWAYa8dX0kdlBz95A8Zr7dd/Q94q9B+grNWQHwAqkV6fzwg+8z3u+e0a1OtTQFadI0nc1mtKl2OYrIFpkU+qAqWbUfswNP7g702diata5tnrVqnQNlCqr0J9rrqY9z7h756+74xW4puLWxanVZSEc6NAY9iwXuB3x44nZ7b3iemyj0mypH0ClcqORzEuKz8zK0WLKwU6Fx0J9btP07U2rdBbmtTS3praW9vVek9vrao9RC7KW1qUxjT2MD8XCvdWtTt6m0GYC5uVPJaoC+hG6iow7sWOG79QF69TOh3h4T3q0qlyb30moiFtJVzUcAlmCksSTgsQPE9PGew2tvTc07utQp16f6OvbUqdsaDNUqrVSizlaqsAukO59k9EnbW1faHptWg11TdKVNKwUW+l2FVqqrT18w6SOWPWx1z2ED8fC7ez0620VWzcUMLU83X6lT35AwfeCemRPI/8AyAUZsm8SLgH7gaJH8TPU7obVr1aqJUq0Vd6LPUomyrW1ek4KZRGfpWUFmViCMYU+M8fxmq+k39ps+mfWAC+eHuKiqAR9yIf8QgbmsXLU0Y9yiE/eVBM55ggCgKOwGB9w6CZQLEksDiaUyEdYIgMyqYMxgcsTETKAiIgMRiWCYEMRmDAxDdZSYCwYFiQSwEREDUPGjYdRHo7Wt8hqZRKjDujK2qjU7eZ0kn+5PU7Er09rUad7Su61CoKbUayUWTSCxBZWWojDuMqwwcH4D193apVRqVRQyOpVlPssrDBBmjtqbJvtgXJu7QmpaucHOShUnpTrAeywz6r+Ph3KwNw7M2DSt3V6Zb1balbKpIKinRLFD2yW9Y5OfLpPxbX3Sp3FSrUNxXRa6olenTKcuqtPIXOpCy9CQdJGRPy7rcQLG9CqtQUqpxmjUYK2fJGPRx0Pbr5gT10DobrdmlUNVzUqBqlejcBlK6qdSgqIhTKnoVTBznIZvOfuTZaCvUuctqq00pMMjSFpmoQVwMgnmN4+AnYTzm8u+ljZKefWBcdqKYauT4AqD6v3tgQPx1rChs1PT7i8r1VtqLU6S1WpkgPo9VdKKWdtCqCxP/eeC4YbPq7Q2hW2xcD1Udiv2eay4VF8wiEf5Z15O0d4rgDHJtabe80qfn16cyqQfd3+qCZu3Y2yqNrRS2oJpRBgDxJ7lmPixOST74H74iICIkgcZMhkbuZVMCwDAEy0wGY1S6RLAwyYmcQESxAglieZ3/3gexs3uaYRnDoqK4YoSzDOQpBPqhj38IHppDNB/TTtL9Ra/grf1ZPpp2l+z2n4K39WBv3ETUO5XE3aF7e0bSpSt1RyxYolUOFRGc4JqED2cdR4z8+9PFm8t7uvbUKVuyUqjIC6VC5Keq+StQD2g3hA3NE1uu/d0NjnalRKPNapopqFcUSOYEOQX1E4WoehHYfHxX007S/UWv4K39WBv6cdWmrqUdQysCGVgCpB6EEHoRNDfTTtL9Ra/grf1Z3u5XE3aF5e0bSpRtlSoW1FEqBwqIznBNQgH1fEQO23h4Q2VYl7V2tmPXSBroZz1wpIK/BsDwE82nD/AHgt/VttoeoPZWnc1UXA7ZQgAfd1nv8AiNvd/Z1ur01Vq1RwtNHyVwuC7MAQSAMDoe7LNYfTTtL9ntPwVv6sDsX3G3krerV2gQp7h7qqU/CoI/KdzsDg1a0yHvK7VyOuhQadL7mOSzfArNjbGvefb0bjGObSSpgdhrQNj85+3EDhtLWnSVaVJFRFGFVQFVR7gJzzWm+fFWjaO1va0xXqoSHctigjDuvTq7A9wMAeecgeI+mXaec8u2x5ct8f6mfzgfQUTwPD7iIm0GNvVpilXVdQCkmnUUY1FM9VIz7Jz065PXH5N5eLVva1qlslq9V6TlGJZUpll6NhhqPQ5HbwgbJlmj04xX1aqlKha26a3VAH5lRsuwUdVZfPym6rhiFYrjI7ZGRn3jIz84GR7wJwmnU+2n4G/ngUqv20/A388DnzGZ+dqNX9Yn4G/nlt9RUE4z1zjoMgkeJPlA5syapNEYgNcSdYgc0REBNT8fLwC3trfxeq9T92mn/yzbE0Jx2vC17So56U6AP3M7sT/lVIHScLt3qN7emjcIXprSd2UFlzgqq9VIPdwfhNwfRVsf8AZm/fVf5p89bPtrlsvbpVP1S1NXPvwSvw6T9fo20vsXX4asD6J2LuRs2yqelW9Eo6qw1GpUYBSPW6MxHYT5m2jdGrVqVm71Kjufvdix/jPpbbrG02PUUsdVOz5YYn1tZpimrE+J1EGfNFjbNVqJRX2qjqg+9mCj+MDZfEIChsbZlnjDOBWI8iKep8+/VcH8557hfu9Rvb3k3Clqa0ndlBZc4KqOqkEes4Pwnecc7kel0LdfZpW4wPIu7dPwok1/YW1y2Wt0qnwJpq59+CV+HSB9C/RVsf9mb99V/mnYbD3G2dZ1fSLagUcKy6jUqMArd+jMR28Z86+jbS+xdfhqzcXEPbRsNl0bFGPOq0Uo5z6wREUVnJ8znT/jJHaBrHiFvCdoXzPTy1NTyqCjJ1KDjUAO5ZiT54KjwnU7z7EayuHtHbUyLTLEdtT01dgPMAsRn3T0vCTZlGpei4uHpqluA4Dsq6qhyKYAY9cEFsjsVHnOXjQabbQFSm6uHoUySjBhqDOuCR44UflA21wru+bsu2Y90V0P8AgdlX/KFnf7bNf0et6Muqty3FIZUeuVIXqxAGDg9T4TwHAi71WVWkTkpXJA8ldFwPmrn4zZ0D512Vws2o1emtxbaKRdea3OokinqGsgK5JOnOOneep4v7D2ba2dIUbanSrGoFp6AFdkVTrL+LKPV6nJyy+Zmxd6d5bewomvXPU5FNAf0lRvsqPLtk9h8s/O21No3u17wHSXqOdNOkvsog6hRnoFHUlj7yYHa8HbR32pSdR0pLVdz5KabUx82dR8Z6/iPuHY29vdbQD1mrM4YB3Tl66tUasBUBwAzHBPhPbcP9z02bQ0Ehq1TDVnHskjsiZ66Vyep7kk9M4HmePF5ptKFDODUr6sea00YH4ZqJ+UDV/DazFXadqh7CpzP3StUH5oJ9OXfsN8P4iaH4F2eq+qVSOlOg3XyZ3VR/l1ze17nQ2O+OniM58oHlrzdt6u1PTHpo1JLemFLojsaqPUYBCTqplSyNqx17TzGx9z7ym9vWqWiObew0hH5L6rlLirUSmrF8IfWQ6+oxkZzNkXVzyxqqV6aDBOWVh0Xufb7dR8wPETiXaSkEi5pYGcnQcDScHPr9OvnA8xuFu9dWrutzRXDKlZai1eZ/tDoEuc5CsC+hGxgqOoDHw9rbewPvb/qM4qLu6h0q02U5wQjEHBwcHX5icloDpGe+Wz4DOo+HhA5oxLECYiWICIiAnzBxMvBV2ndMOy1BT+7lKtMj5qZ9PzUV/wAGDVqvWbafrVHZz/s3izFj/vffA7vglZ6Nm6/1tao/wXTTx86Z+c2HOp3Z2OtnbUrRW1CmuNWnTqJYszacnGWYnuZ2sDX/ABrveXs1k/XVaafBSan/AIx85p/hrZCttO1QjotTmfulaoPzQTeW/wBuc200pU/SeStNmc/o+ZqYgBfrrjA1eedXhidXuRwzGz7n0o3fO9RkC8nl4LEetnW3gCMY8YGpOJ97zdp3LA5CuKY8hy1VGH4labZ4I2ejZ3M/W1qj/BQtMD5o3znT7Q4MmtVqV22lhqju5Ho2cF2LH/e++bG3Y2Mtla0rRX1impGvTp1FmLM2nJxksT3MDs6jhQWYgAAkknAAHUknyny5v1vAb68qXPXR7FIHwpLnT9xJJYjwLGfR29Gyal3bPa07jk8wBWfRrOj6ygal9odCc9ifOeD2Dwep29xSuKl7zVpuH5fJ0BmXqmW5h6BtJIwc4x4wNcjhrtgjPoLdf79IH5F+k6nb27F7ZaDd0DT5mrRlkbVp06vZJx7Q7z6wnlN/tzhtKnTp8/lGm5YNo15BXBXGpceBznwga74BXYFe5oeL00qD/wDNyp/1RNn74700NnUOfVyzNlaVMdGqPjtn6qjuW8B5kgHze5PDU7OufShfcwaGRl5OjIbB9rmNjBUHtOw3/wBxjtM0T6VyRRD4HK5movoyc61x7AgaB3i2/cXtZri5fUx9kDoiL4Ii+Cj5nucnrNg7l77bG2dS0U7e5eqwHMrFKWpj3wv6T1Uz2X55M/b9Bv8AxP8A5b/2x9Bv/E/+W/8AbA2NulvRR2jSevQp1FVHNM8wICWCqxxpZumGE1Tx6vdVzb0PsUS/xqORj5Ux85tXcrdtdn2wtRU5hDu5fTo1Fj9nUcYAUd/CeX3x4YNf3T3bX/LDBFVORr0BFAxq5gzk6j2+tA6zgHZYo3Nx9uolMe7lqWP+oPkJtW79hvh/ETpNyt2l2fbC1FTmHWzs+nRqLY+rqOMAKO/hO8rpqUqDgkd8ZHyyMwOo3jrKukswHRiCaBracFMtgA46Er4Z5g65AnTtdKzaTcITnsbYMdJcDSWCjqdJXGAScdiMT12mp9tPwN/PGmp9tPwN/PA6vd0Npb9IrL+jACU1pqG5aszDT3DBlPu7Z8B2lr7A+9v+oxpqfbT8DfzxQQqoUnJ65OMDqSe2TjvA5YiIDEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERECREQEokEsBESQLJEQEREBERAsRJAsSRAsSRmBYkiBYiICIkgWIkgWJIzAREQERAgWIiAgSSwEmJYgSJcSQESxASRmICMRLAmJDMpICIiAiIgJCZZi6wGqZTAL75liBYiICIiAiIgJZJYEiIgJZJYCIiAiIgSIjEBESwERJAREQEskQEhlgiBxnvOSTEsBESwJiJYgQSxECSxEAIiICIiBBBiIFiIgIiIEMRECzEyxAQYiBTJEQLMRLEBERAREQLERA/9k=",
        type: "Games",
    },
    {
        name: "FIFA 20",
        icon: "https://assets1.ignimgs.com/2019/09/09/fifa-20---button-2020-1568061446797.jpg",
        type: "Games",
    },
    {
        name: "NBA 2K23",
        icon: "https://image.api.playstation.com/vulcan/ap/rnd/202206/2200/vLdTCoRLhhHmAAqRypgAOlAI.png",
        type: "Games",
    },
    {
        name: "NBA 2K22",
        icon: "https://image.api.playstation.com/vulcan/ap/rnd/202106/3002/Eaq9uyUlyLZK8L5xTlsPl0rM.png",
        type: "Voucher",
    },
    {
        name: "NBA 2K21",
        icon: "https://assets.2k.com/1a6ngf98576c/5DYwMCuE9rOloEOJkPGYTr/476ad15ed61a038bba13eaf81e3c89f3/DAME_828x828.jpg",
        type: "Games",
    },
    {
        name: "im3",
        icon: "https://im3-img.indosatooredoo.com/indosatassets/images/icons/icon-512x512.png",
        type: "Pulsa",
    },
    {
        name: "Telkomsel",
        icon: "https://play-lh.googleusercontent.com/DBzJQ2z8p3n_YPQkmbc6luCfO3OhafRkOZimMoXFXBMoUokLu6RPDRgVM86U_QkRVNE",
        type: "Pulsa",
    },
    {
        name: "PLN",
        icon: "https://play-lh.googleusercontent.com/C_ABhRDwsX3DW8xmfPiukQCIcjTWL5O18IdszUSYL5FqT142eNKSZsMcwRd4djMUDIY",
        type: "PLN",
    },
];

export default function ListGame() {
    const [lastIdxGames, setLastIdxGames] = React.useState<number>(8);
    const [filter, setfilter] = useState<null | string>(null);
    const [games, _] = useState<Array<game>>(myGames);
    const [searchGames, setSearchGames] = useState<Array<game>>(games);

    const showMore = () => {
        setLastIdxGames((last) => last + 8);
    };

    const search = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (name.length === 0) {
            setSearchGames(games);
            return;
        }

        var res = games.filter((item) =>
            item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        );
        setSearchGames(res);
    }, []);

    return (
        <React.Fragment>
            <div className="flex items-end justify-between">
                <h5 className="mr-8 text-xl">Games</h5>
                <div
                    className="no-scrollbar z-10"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        overflowX: "auto",
                        scrollbarWidth: "none",
                    }}
                >
                    {chips.map((val, idx) => (
                        <Badge
                            className="mx-1 cursor-pointer"
                            key={idx.toString()}
                            color="primary"
                            variant={
                                filter === null && val === "All"
                                    ? "destructive"
                                    : val == filter
                                    ? "destructive"
                                    : "outline"
                            }
                            onClick={() => setfilter(val == "All" ? null : val)}
                        >
                            {val}
                        </Badge>
                    ))}
                </div>
            </div>
            <Input
                onChange={search}
                placeholder="Cari Game..."
                className="my-3"
            />
            <div className="grid xs:grid-cols-3 grid-cols-4 gap-3 mt-4 place-items-center justify-center">
                {searchGames.slice(0, lastIdxGames).map(
                    (val: game, idx) =>
                        (filter == null ||
                            (filter != null && filter == val.type)) && (
                            <Link href={`/games/${val.name}`}>
                                <Card className="w-full h-full min-w-fit rounded-sm">
                                    <CardContent className="p-1 flex flex-col items-center">
                                        <img
                                            alt="Remy Sharp"
                                            className="rounded"
                                            src={val.icon}
                                        />
                                        <p className="text-xs my-2">
                                            {val.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                )}
            </div>
            {lastIdxGames < searchGames.length && (
                <div className="flex items-center justify-center my-2 mt-6">
                    <Button onClick={showMore}>Show More</Button>
                </div>
            )}
        </React.Fragment>
    );
}
