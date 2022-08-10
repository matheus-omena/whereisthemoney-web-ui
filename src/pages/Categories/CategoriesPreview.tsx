import { ArrowLeft, ArrowRight, Folders } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CategoriesApi } from "../../apis/CategoriesApi";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import DefaultTransition from "../../components/General/DefaultTransition";
import Spinner from "../../components/General/Spinner";
import { CategoryModel } from "../../models/CategoryModel";
import { ViewMode } from "../../models/RegistersEnums";
import CategoriesList from "./CategoriesList";

export function CategoriesPreview() {
    const _api = useMemo(() => new CategoriesApi(), []);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>();
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PREVIEW);

    const loadRegisters = useCallback(() => {
        setViewMode(ViewMode.PREVIEW);
        setLoading(true);
        _api
            .find()
            .then((r) => {
                setCategories(r.data);
            })
            .catch((e) => console.log("Erro ao carregar as categorias"))
            .finally(() => setLoading(false));
    }, [_api]);

    useEffect(() => {
        loadRegisters();
    }, [loadRegisters]);

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Premissas</span>
                    <span className="font-medium text-zinc-900 dark:text-white">Categorias</span>
                </div>
                {
                    viewMode === ViewMode.PREVIEW ?
                        <button type="button" className="flex items-center gap-1 text-xs text-[#535353] hover:text-white transition-colors" onClick={() => setViewMode(ViewMode.LIST)}>
                            Ir para o cadastro <ArrowRight weight="bold" size={12} />
                        </button> :
                        <button type="button" className="flex items-center gap-1 text-xs text-[#535353] hover:text-white transition-colors" onClick={() => setViewMode(ViewMode.PREVIEW)}>
                            <ArrowLeft weight="bold" size={12} /> Voltar para visualização
                        </button>
                }
            </div>
            {/* Header */}

            {
                loading ? <Spinner /> :
                    viewMode === ViewMode.PREVIEW ?
                        <DefaultTransition>
                            {
                                categories && categories?.length > 0 ?
                                    <div className="grid grid-cols-2 gap-3">
                                        {
                                            categories?.map((item) => {
                                                return (
                                                    <div key={item.id} className="flex flex-row items-center gap-2">
                                                        <Folders size={20} weight="fill" color="#71717a" />
                                                        <span className="text-sm font-medium text-[#535353]">{item.name}</span>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div> :
                                    <div className="flex flex-col items-center">
                                        <Folders size={25} weight="fill" color="#71717a" />
                                        <span className="font-medium text-[#71717a] text-sm mt-2">Sem categorias cadastradas</span>
                                    </div>
                            }
                        </DefaultTransition> :
                        <CategoriesList categories={categories} onReload={loadRegisters} />
            }
        </BackgroundAreaDefault>
    );
}